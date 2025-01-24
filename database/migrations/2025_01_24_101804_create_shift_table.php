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
        Schema::create('shift', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->time('mulai_jam_masuk')->default('00:00:00');
            $table->time('jam_masuk');
            $table->time('turning_point');
            $table->time('jam_keluar');
            $table->time('selesai_jam_keluar')->default('23:59:59');
            $table->float('jam_kerja', 7.5, 2);
            $table->float('durasi_istirahat', 1, 2);
            $table->float('durasi_istirahat_jumat', 1, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shift');
    }
};
