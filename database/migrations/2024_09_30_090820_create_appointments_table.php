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
        Schema::create('appointments', function (Blueprint $table) {
            $table->string('id', 12)->primary();
            $table->string('client', 6)->nullable();
            $table->string('pet', 6)->nullable();
            $table->unsignedBigInteger('service')->nullable();
            $table->unsignedBigInteger("service_type")->nullable();
            $table->dateTime('date_time');

            $table->dateTime('approved_at')->nullable();
            $table->dateTime('rejected_at')->nullable();
            $table->dateTime('cancelled_at')->nullable();
            $table->text('reason')->nullable();
            $table->longText('note')->nullable();
            $table->string('status');
            $table->unsignedBigInteger("medical_history")->nullable();
            
            $table->timestamps();

            $table->foreign('client')
            ->references('id')
            ->on('user_clients')
            ->nullOnDelete()
            ->cascadeOnUpdate();

            $table->foreign('pet')
            ->references('id')
            ->on('pets')
            ->nullOnDelete()
            ->cascadeOnUpdate();

            $table->foreign('service')
            ->references('id')
            ->on('clinic_services')
            ->nullOnDelete()
            ->cascadeOnUpdate();

            $table->foreign('medical_history')
            ->references('id')
            ->on('medical_histories')
            ->nullOnDelete()
            ->cascadeOnUpdate();

            $table->foreign('service_type')
            ->references('id')
            ->on('clinic_service_types')
            ->nullOnDelete()
            ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
