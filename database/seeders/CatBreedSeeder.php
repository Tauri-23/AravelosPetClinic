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
        DB::table('pet_breeds')->insert([
            ['breed' => 'Abyssinian', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'American Bobtail', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'American Curl', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'American Shorthair', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'American Wirehair', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Balinese', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Bengal', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Birman', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Bombay', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'British Shorthair', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Burmese', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Burmilla', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Chartreux', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Colorpoint Shorthair', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Cornish Rex', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Devon Rex', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Egyptian Mau', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'European Burmese', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Exotic', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Havana Brown', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Japanese Bobtail', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Khao Manee', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Korat', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'LaPerm', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Lykoi', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Maine Coon Cat', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Manx', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Moggy (Mixed Breed)', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Norwegian Forest Cat', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Ocicat', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Oriental', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Other', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Persian', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Puspin', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'RagaMuffin', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Ragdoll', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Russian Blue', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Scottish Fold', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Selkirk Rex', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Siamese', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Siberian', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Singapura', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Somali', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Sphynx', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Tonkinese', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Toybob', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Turkish Angora', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['breed' => 'Turkish Van', 'pet_type' => 2, 'created_at' => now(), 'updated_at' => now()]
        ]);
    }
}
