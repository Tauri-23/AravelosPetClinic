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
        Schema::create('clinic_service_types', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("service")->nullable();
            $table->string("service_type");
            $table->timestamps();

            $table->foreign("service")
            ->references("id")
            ->on("clinic_services")
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clinic_service_types');
    }
};
