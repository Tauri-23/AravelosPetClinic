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
        Schema::create('inventories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('qty');
            $table->longText('desc');
            $table->longText('picture')->nullable();
            $table->integer('measurement_value')->nullable();
            $table->string('measurement_unit')->nullable();
            $table->integer('dosage_value');
            $table->enum('dosage_type', ["ml", "pcs"]);
            $table->float('price')->default(0);
            $table->float('toy_deduct')->nullable();
            $table->float('sm_deduct')->nullable();
            $table->float('med_deduct')->nullable();
            $table->float('lg_deduct')->nullable();
            $table->enum("status", ["active", "discontinued"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventories');
    }
};
