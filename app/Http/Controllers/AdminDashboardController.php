<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Inquiry;
use App\Models\Project;
use App\Models\Service;
use App\Models\StudioSetting;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $teamMembers = TeamMember::orderBy('sort_order')->orderBy('id')->get();
        $clients = Client::orderBy('sort_order')->orderBy('id')->get();
        $projects = Project::orderBy('sort_order')->orderBy('id')->get();
        $services = Service::orderBy('sort_order')->orderBy('id')->get();
        $inquiries = Inquiry::latest()->get();
        
        $studioInfo = StudioSetting::get('studio_info', []);
        $stats = StudioSetting::get('stats', []);

        return Inertia::render('Dashboard', [
            'teamMembers' => $teamMembers,
            'clients' => $clients,
            'projects' => $projects,
            'services' => $services,
            'inquiries' => $inquiries,
            'studioInfo' => $studioInfo,
            'stats' => $stats,
        ]);
    }

    // 1. Team Members
    public function saveTeamMember(Request $request, $id = null)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'role' => 'required|string|max:150',
            'division' => 'required|string|max:150',
            'image' => 'nullable|string|max:500',
            'status' => 'nullable|string|max:100',
            'bio' => 'nullable|string|max:2000',
            'experience' => 'nullable|string|max:100',
            'badge' => 'nullable|string|max:100',
            'skills' => 'nullable|array',
            'skills.*' => 'string',
            'links' => 'nullable|array',
            'sort_order' => 'nullable|integer',
        ]);

        if (empty($validated['image'])) {
            $validated['image'] = '/images/team/team_tanvir.jpg';
        }

        if ($id) {
            $member = TeamMember::findOrFail($id);
            $member->update($validated);
            $msg = "Team member '{$member->name}' updated successfully!";
        } else {
            $member = TeamMember::create($validated);
            $msg = "New team member '{$member->name}' added successfully!";
        }

        return redirect()->route('admin.dashboard')->with('flash', [
            'type' => 'success',
            'message' => $msg,
        ]);
    }

    public function deleteTeamMember($id)
    {
        $member = TeamMember::findOrFail($id);
        $name = $member->name;
        $member->delete();

        return redirect()->route('admin.dashboard')->with('flash', [
            'type' => 'success',
            'message' => "Team member '{$name}' deleted successfully!",
        ]);
    }

    // 2. Clients
    public function saveClient(Request $request, $id = null)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'tag' => 'required|string|max:150',
            'country' => 'required|string|max:100',
            'website' => 'required|string|max:300',
            'completed_project' => 'required|string|max:300',
            'category' => 'required|string|max:100',
            'impact' => 'nullable|string|max:150',
            'accent' => 'nullable|string|max:50',
            'sort_order' => 'nullable|integer',
        ]);

        if ($id) {
            $client = Client::findOrFail($id);
            $client->update($validated);
            $msg = "Client '{$client->name}' updated successfully!";
        } else {
            $client = Client::create($validated);
            $msg = "Client '{$client->name}' added successfully!";
        }

        return redirect()->route('admin.dashboard')->with('flash', [
            'type' => 'success',
            'message' => $msg,
        ]);
    }

    public function deleteClient($id)
    {
        $client = Client::findOrFail($id);
        $name = $client->name;
        $client->delete();

        return redirect()->route('admin.dashboard')->with('flash', [
            'type' => 'success',
            'message' => "Client '{$name}' deleted successfully!",
        ]);
    }

    // 3. Projects
    public function saveProject(Request $request, $id = null)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'tagline' => 'required|string|max:250',
            'category' => 'required|string|max:100',
            'type' => 'required|string|max:100',
            'image' => 'nullable|string|max:500',
            'client' => 'required|string|max:150',
            'summary' => 'required|string',
            'results' => 'nullable|array',
            'results.*' => 'string',
            'tech' => 'nullable|array',
            'tech.*' => 'string',
            'status' => 'nullable|string|max:100',
            'featured' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $validated['slug'] = \Illuminate\Support\Str::slug($validated['title']);

        if ($id) {
            $project = Project::findOrFail($id);
            $project->update($validated);
            $msg = "Project '{$project->title}' updated successfully!";
        } else {
            $project = Project::create($validated);
            $msg = "Project '{$project->title}' created successfully!";
        }

        return redirect()->route('admin.dashboard')->with('flash', [
            'type' => 'success',
            'message' => $msg,
        ]);
    }

    public function deleteProject($id)
    {
        $project = Project::findOrFail($id);
        $title = $project->title;
        $project->delete();

        return redirect()->route('admin.dashboard')->with('flash', [
            'type' => 'success',
            'message' => "Project '{$title}' deleted successfully!",
        ]);
    }

    // 4. Services
    public function saveService(Request $request, $id = null)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'subtitle' => 'required|string|max:200',
            'category' => 'required|string|max:100',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:50',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'tech' => 'nullable|array',
            'tech.*' => 'string',
            'highlight' => 'nullable|string|max:100',
            'gradient' => 'nullable|string|max:150',
            'sort_order' => 'nullable|integer',
        ]);

        $validated['slug'] = \Illuminate\Support\Str::slug($validated['title']);

        if ($id) {
            $service = Service::findOrFail($id);
            $service->update($validated);
            $msg = "Service '{$service->title}' updated successfully!";
        } else {
            $service = Service::create($validated);
            $msg = "Service '{$service->title}' created successfully!";
        }

        return redirect()->route('admin.dashboard')->with('flash', [
            'type' => 'success',
            'message' => $msg,
        ]);
    }

    // 5. Studio Settings & Stats
    public function updateStudioInfo(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'legalName' => 'required|string|max:200',
            'slogan' => 'required|string|max:300',
            'mission' => 'required|string',
            'tagline' => 'required|string|max:200',
            'address' => 'required|string|max:300',
            'phone' => 'required|string|max:100',
            'phoneRaw' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'website' => 'required|string|max:150',
            'hours' => 'required|string|max:200',
            'status' => 'required|string|max:200',
        ]);

        $existing = StudioSetting::get('studio_info', []);
        $merged = array_merge($existing, $validated);

        StudioSetting::set('studio_info', $merged);

        return redirect()->route('admin.dashboard')->with('flash', [
            'type' => 'success',
            'message' => 'Studio Information & Address updated successfully!',
        ]);
    }

    public function updateStats(Request $request)
    {
        $validated = $request->validate([
            'stats' => 'required|array',
            'stats.*.label' => 'required|string|max:100',
            'stats.*.value' => 'required|string|max:50',
            'stats.*.suffix' => 'required|string|max:50',
        ]);

        StudioSetting::set('stats', $validated['stats']);

        return redirect()->route('admin.dashboard')->with('flash', [
            'type' => 'success',
            'message' => 'Studio Telemetry & Stats updated successfully!',
        ]);
    }

    // 6. Inquiries
    public function updateInquiryStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:NEW,CONTACTED,IN_DISCUSSION,CLOSED',
        ]);

        $inquiry = Inquiry::findOrFail($id);
        $inquiry->update(['status' => $validated['status']]);

        return redirect()->route('admin.dashboard')->with('flash', [
            'type' => 'success',
            'message' => "Inquiry from {$inquiry->name} marked as {$validated['status']}",
        ]);
    }

    public function deleteInquiry($id)
    {
        $inquiry = Inquiry::findOrFail($id);
        $name = $inquiry->name;
        $inquiry->delete();

        return redirect()->route('admin.dashboard')->with('flash', [
            'type' => 'success',
            'message' => "Inquiry from {$name} deleted.",
        ]);
    }

    // 7. Image Upload
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp,svg|max:5120',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '', $file->getClientOriginalName());
            
            $destinationPath = public_path('images/uploads');
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            $file->move($destinationPath, $filename);
            $url = '/images/uploads/' . $filename;

            return response()->json([
                'success' => true,
                'url' => $url,
            ]);
        }

        return response()->json(['success' => false, 'message' => 'No image uploaded'], 400);
    }
}
