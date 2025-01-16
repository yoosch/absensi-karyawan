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
        Schema::create('laporan_bulanan_record', function (Blueprint $table) {
            $table->id();
            $table->string('nik')->foreign('nik')->references('nik')->on('users');
            $table->string('nama');
            $table->string('bulan');
            $table->integer('tahun');
            $table->string('file_laporan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporan_bulanan_record');
    }
};
