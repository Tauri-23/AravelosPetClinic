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

            $table->date('appointment_date')->nullable();
            $table->time('appointment_time')->nullable();

            $table->dateTime('approved_at')->nullable();
            $table->dateTime('rejected_at')->nullable();
            $table->dateTime('cancelled_at')->nullable();
            $table->text('reason')->nullable();
            $table->longText('note')->nullable();
            $table->enum('status', ["Pending", "Approved", "Completed", "Cancelled"]);
            $table->enum("type", ["Online", "OTC"]);
            
            $table->timestamps();

            $table->foreign('client')
            ->references('id')
            ->on('user_clients')
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
