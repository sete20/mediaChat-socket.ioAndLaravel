<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->longText('content');
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->tinyInteger('content_type')->default(1)->comment('message:1,file:2');
            $table->tinyInteger('status')->default(0)->comment('read:1, unseen:0');
            $table->unsignedBigInteger('sender_id');
            $table->unsignedBigInteger('receiver_id')->nullable();
            $table->tinyInteger('type')->default(1)->comment('group message:1,personal message:2');
            $table->tinyInteger('seen_status')->default(0)->comment('read:1, unseen:0');
            $table->tinyInteger('deliver_status')->default(0)->comment('delivered 1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
