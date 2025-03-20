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
        Schema::create('pet_medical_history_allergies', function (Blueprint $table) {
            $table->id();
            $table->string('pet', 6)->nullable();
            $table->string("allergy");
            $table->timestamps();

            $table->foreign("pet")
            ->references("id")
            ->on("pets")
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pet_medical_history_allergies');
    }
};
