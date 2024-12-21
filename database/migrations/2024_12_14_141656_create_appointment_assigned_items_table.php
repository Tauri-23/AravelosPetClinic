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
        Schema::create('appointment_assigned_items', function (Blueprint $table) {
            $table->id();
            $table->string('appointment', 12)->nullable();
            $table->string('item', 12)->nullable();
            $table->timestamps();

            $table->foreign('appointment')
            ->references('id')
            ->on('appointments')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();

            $table->foreign('item')
            ->references('id')
            ->on('inventory_items_useds')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointment_assigned_items');
    }
};
