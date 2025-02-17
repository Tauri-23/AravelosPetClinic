<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class CatBreedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $breeds = [
            ['cat_breed' => 'Abyssinian', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'American Bobtail', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'American Curl', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'American Shorthair', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'American Wirehair', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Balinese', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Bengal', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Birman', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Bombay', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'British Shorthair', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Burmese', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Burmilla', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Chartreux', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Colorpoint Shorthair', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Cornish Rex', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Devon Rex', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Egyptian Mau', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'European Burmese', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Exotic', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Havana Brown', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Japanese Bobtail', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Khao Manee', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Korat', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'LaPerm', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Lykoi', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Maine Coon Cat', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Manx', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Moggy (Mixed Breed)', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Norwegian Forest Cat', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Ocicat', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Oriental', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Other', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Persian', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Puspin', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'RagaMuffin', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Ragdoll', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Russian Blue', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Scottish Fold', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Selkirk Rex', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Siamese', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Siberian', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Singapura', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Somali', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Sphynx', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Tonkinese', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Toybob', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Turkish Angora', 'created_at' => now(), 'updated_at' => now()],
            ['cat_breed' => 'Turkish Van', 'created_at' => now(), 'updated_at' => now()]
        ];
        foreach ($breeds as $breed) {
            DB::table('cat_breeds')->updateOrInsert(
                ['cat_breed' => $breed['cat_breed']], // The unique value to check for duplication
                $breed // The data to insert or update
            );
        }
    }
}
