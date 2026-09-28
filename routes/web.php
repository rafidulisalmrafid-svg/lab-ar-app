<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\LabArController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LabArController::class, 'index'])->name('home');
Route::post('/contact', [LabArController::class, 'submitContact'])->name('contact.submit');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
    
    // Team Members
    Route::post('/team/save/{id?}', [AdminDashboardController::class, 'saveTeamMember'])->name('team.save');
    Route::delete('/team/{id}', [AdminDashboardController::class, 'deleteTeamMember'])->name('team.delete');

    // Clients
    Route::post('/clients/save/{id?}', [AdminDashboardController::class, 'saveClient'])->name('clients.save');
    Route::delete('/clients/{id}', [AdminDashboardController::class, 'deleteClient'])->name('clients.delete');

    // Projects
    Route::post('/projects/save/{id?}', [AdminDashboardController::class, 'saveProject'])->name('projects.save');
    Route::delete('/projects/{id}', [AdminDashboardController::class, 'deleteProject'])->name('projects.delete');

    // Services
    Route::post('/services/save/{id?}', [AdminDashboardController::class, 'saveService'])->name('services.save');

    // Studio & Stats Settings
    Route::post('/settings/studio', [AdminDashboardController::class, 'updateStudioInfo'])->name('settings.studio');
    Route::post('/settings/stats', [AdminDashboardController::class, 'updateStats'])->name('settings.stats');

    // Inquiries
    Route::post('/inquiries/{id}/status', [AdminDashboardController::class, 'updateInquiryStatus'])->name('inquiries.status');
    Route::delete('/inquiries/{id}', [AdminDashboardController::class, 'deleteInquiry'])->name('inquiries.delete');

    // Upload
    Route::post('/upload-image', [AdminDashboardController::class, 'uploadImage'])->name('upload.image');
});

Route::get('/dashboard', fn() => redirect()->route('admin.dashboard'));
