<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('medical_history_laboratory_exams', function (Blueprint $table) {
            $table->id();

            $table->boolean("blood_exam")->default(false);
            $table->string("blood_exam_result")->nullable();

            $table->boolean("distemper_test")->default(false);
            $table->string("distemper_test_result")->nullable();

            $table->boolean("ear_swabbing")->default(false);
            $table->string("ear_swabbing_result")->nullable();

            $table->boolean("ehrlichia_test")->default(false);
            $table->string("ehrlichia_test_result")->nullable();

            $table->boolean("heartworm_test")->default(false);
            $table->string("heartworm_test_result")->nullable();

            $table->boolean("parvo_test")->default(false);
            $table->string("parvo_test_result")->nullable();

            $table->boolean("skin_scraping")->default(false);
            $table->string("skin_scraping_result")->nullable();

            $table->boolean("stool_exam")->default(false);
            $table->string("stool_exam_result")->nullable();

            $table->boolean("ultrasound")->default(false);
            $table->string("ultrasound_result")->nullable();

            $table->boolean("urine_exam")->default(false);
            $table->string("urine_exam_result")->nullable();

            $table->boolean("vaginal_smear")->default(false);
            $table->string("vaginal_smear_result")->nullable();

            $table->boolean("xray")->default(false);
            $table->string("xray_result")->nullable();

            $table->boolean("eye_strain")->default(false);
            $table->string("eye_strain_result")->nullable();


            $table->string("other_test")->nullable();
            $table->string("other_test_result")->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_history_laboratory_exams');
    }
};
