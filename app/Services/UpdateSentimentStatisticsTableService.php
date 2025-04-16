<?php

namespace App\Services;

use App\Models\feedbacks;
use App\Models\sentiment_analysis;
use DB;
use Illuminate\Support\Facades\Http;
use App\Contracts\IUpdateSentimentStatisticsTableService;

class UpdateSentimentStatisticsTableService implements IUpdateSentimentStatisticsTableService 
{
    public function updateStatistics()
    {
        DB::beginTransaction();

        try {
            $sentiments = feedbacks::where("status", "not-processed")->get();
            if ($sentiments->isEmpty()) {
                return [
                    "update_sentiment_status" => 200,
                    "update_sentiment_message" => "There are currently no unprocessed feedbacks"
                ];
            }

            $filteredSentiments = $sentiments->pluck('content')->toArray();

            $response = Http::timeout(120)->post("http://82.25.105.148:8010/analyze", [
                'feedbacks' => $filteredSentiments
            ]);

            $results = $response->json();

            $categories = [
                "Pricing" => [],
                "Vet Care" => [],
                "Customer Service" => [],
                "hygiene" => [],
                "Waiting Time" => [],
                "Booking Experience" => []
            ];

            foreach ($results as $result) {
                foreach ($result["analysis"] as $aspect => $data) {
                    if ($data["mentioned"]) {
                        $label = ucwords(str_replace("_", " ", $aspect));
                        if (isset($categories[$label])) {
                            $categories[$label][] = [
                                "sentiment" => $data["sentiment"],
                                "feedback" => $result["feedback"]
                            ];
                        }
                    }
                }
            }

            foreach ($categories as $aspect => $feedbacks) {
                if (count($feedbacks) > 0) {
                    $existingSentiment = sentiment_analysis::firstOrCreate(["aspect" => $aspect]);

                    $existingPos = json_decode($existingSentiment->positive_comments ?? '[]', true);
                    $existingNeu = json_decode($existingSentiment->neutral_comments ?? '[]', true);
                    $existingNeg = json_decode($existingSentiment->negative_comments ?? '[]', true);

                    $newPos = array_column(array_filter($feedbacks, fn($f) => strtolower(trim($f['sentiment'])) === 'positive'), 'feedback');
                    $newNeu = array_column(array_filter($feedbacks, fn($f) => strtolower(trim($f['sentiment'])) === 'neutral'), 'feedback');
                    $newNeg = array_column(array_filter($feedbacks, fn($f) => strtolower(trim($f['sentiment'])) === 'negative'), 'feedback');

                    $updatedPos = array_merge($existingPos, $newPos);
                    $updatedNeu = array_merge($existingNeu, $newNeu);
                    $updatedNeg = array_merge($existingNeg, $newNeg);

                    $positiveCount = count($updatedPos);
                    $neutralCount = count($updatedNeu);
                    $negativeCount = count($updatedNeg);
                    $total = $positiveCount + $neutralCount + $negativeCount;

                    $existingSentiment->update([
                        "positive_percent" => $total > 0 ? round(($positiveCount / $total) * 100, 2) : 0,
                        "neutral_percent" => $total > 0 ? round(($neutralCount / $total) * 100, 2) : 0,
                        "negative_percent" => $total > 0 ? round(($negativeCount / $total) * 100, 2) : 0,
                        "positive_count" => $positiveCount,
                        "neutral_count" => $neutralCount,
                        "negative_count" => $negativeCount,
                        "positive_comments" => json_encode($updatedPos),
                        "neutral_comments" => json_encode($updatedNeu),
                        "negative_comments" => json_encode($updatedNeg)
                    ]);
                }
            }

            foreach ($sentiments as $sentiment) {
                $sentiment->update(["status" => "processed"]);
            }

            DB::commit();

            return [
                "update_sentiment_status" => 200,
                "update_sentiment_message" => "Success"
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            return [
                "update_sentiment_status" => 500,
                "update_sentiment_message" => $e->getMessage()
            ];
        }
    }
}