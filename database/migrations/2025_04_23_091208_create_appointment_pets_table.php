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
        Schema::create('appointment_pets', function (Blueprint $table) {
            $table->id();
            $table->string("pet", 6)->nullable();
            $table->string("appointment", 12)->nullable();
            $table->timestamps();

            $table->foreign("pet")
            ->references("id")
            ->on("pets")
            ->nullOnDelete()
            ->cascadeOnUpdate();

            $table->foreign("appointment")
            ->references("id")
            ->on("appointments")
            ->nullOnDelete()
            ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointment_pets');
    }
};
