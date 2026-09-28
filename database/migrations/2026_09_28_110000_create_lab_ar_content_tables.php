<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role');
            $table->string('division');
            $table->string('image')->default('/images/team/team_tanvir.jpg');
            $table->string('status')->default('ONLINE // LAB LEAD');
            $table->text('bio')->nullable();
            $table->string('experience')->default('5+ Years Exp');
            $table->string('badge')->nullable();
            $table->json('skills')->nullable();
            $table->json('links')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->nullable();
            $table->string('name');
            $table->string('tag');
            $table->string('country')->default('Bangladesh');
            $table->string('website');
            $table->string('completed_project');
            $table->string('category')->default('Enterprise');
            $table->string('impact')->nullable();
            $table->string('accent')->default('cyan');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('tagline');
            $table->string('category');
            $table->string('type');
            $table->string('image')->default('/images/hero_xr.jpg');
            $table->string('client');
            $table->text('summary');
            $table->json('results')->nullable();
            $table->json('tech')->nullable();
            $table->string('status')->default('Live');
            $table->boolean('featured')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('subtitle');
            $table->string('category');
            $table->text('description');
            $table->string('icon')->default('Boxes');
            $table->json('features')->nullable();
            $table->json('tech')->nullable();
            $table->string('highlight')->nullable();
            $table->string('gradient')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('company')->nullable();
            $table->string('service');
            $table->string('budget')->nullable();
            $table->string('timeline')->nullable();
            $table->text('message');
            $table->string('status')->default('NEW');
            $table->timestamps();
        });

        Schema::create('studio_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->json('value')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('studio_settings');
        Schema::dropIfExists('inquiries');
        Schema::dropIfExists('services');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('clients');
        Schema::dropIfExists('team_members');
    }
};
