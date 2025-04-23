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
        Schema::create('appointment_pets_services', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("appointment_pet")->nullable();
            $table->unsignedBigInteger("service")->nullable();
            $table->unsignedBigInteger("service_type")->nullable();
            $table->timestamps();

            $table->foreign("appointment_pet")
            ->references("id")
            ->on("appointment_pets")
            ->nullOnDelete()
            ->cascadeOnUpdate();

            $table->foreign("service")
            ->references("id")
            ->on("clinic_services")
            ->nullOnDelete()
            ->cascadeOnUpdate();

            $table->foreign("service_type")
            ->references("id")
            ->on("clinic_service_types")
            ->nullOnDelete()
            ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointment_pets_services');
    }
};
