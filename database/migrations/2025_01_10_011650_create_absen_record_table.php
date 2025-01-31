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
        Schema::create('absen_record', function (Blueprint $table) {
            $table->id();
            $table->string('nik'); 
            $table->date('tanggal')->index();
            $table->time('waktu_masuk')->nullable();
            $table->time('waktu_keluar')->nullable(); 
            $table->json('koordinat_masuk')->nullable(); 
            $table->json('koordinat_keluar')->nullable(); 
            $table->string('photo_masuk_url')->nullable(); 
            $table->string('photo_keluar_url')->nullable();
            $table->string('status')->default('alpha'); 
            $table->timestamps();


            $table->foreign('nik')->references('nik')->on('users')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absen_record');
    }
};
