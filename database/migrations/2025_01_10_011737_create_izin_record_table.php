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
        Schema::create('izin_record', function (Blueprint $table) {
            $table->id();
            $table->string('nik')->foreign('nik')->references('nik')->on('users'); 
            $table->string('jenis_izin');
            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai');
            $table->string('deskripsi');
            $table->string('alamat_cuti')->nullable();
            $table->string('surat_pendukung');
            $table->string('status_persetujuan')->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('izin_record');
    }
};
