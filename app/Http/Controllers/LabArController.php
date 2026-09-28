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

class LabArController extends Controller
{
    public function index(): Response
    {
        $services = Service::orderBy('sort_order')->orderBy('id')->get()->map(function ($s) {
            return [
                'id' => $s->slug,
                'title' => $s->title,
                'subtitle' => $s->subtitle,
                'category' => $s->category,
                'description' => $s->description,
                'icon' => $s->icon,
                'features' => $s->features ?? [],
                'tech' => $s->tech ?? [],
                'highlight' => $s->highlight,
                'gradient' => $s->gradient,
            ];
        });

        $projects = Project::orderBy('sort_order')->orderBy('id')->get()->map(function ($p) {
            return [
                'id' => $p->slug,
                'title' => $p->title,
                'tagline' => $p->tagline,
                'category' => $p->category,
                'type' => $p->type,
                'image' => $p->image,
                'client' => $p->client,
                'summary' => $p->summary,
                'results' => $p->results ?? [],
                'tech' => $p->tech ?? [],
                'status' => $p->status,
                'featured' => (bool)$p->featured,
            ];
        });

        $clients = Client::orderBy('sort_order')->orderBy('id')->get()->map(function ($c) {
            return [
                'id' => $c->slug ?: \Illuminate\Support\Str::slug($c->name),
                'name' => $c->name,
                'tag' => $c->tag,
                'country' => $c->country,
                'website' => $c->website,
                'completedProject' => $c->completed_project,
                'category' => $c->category,
                'impact' => $c->impact,
                'accent' => $c->accent,
            ];
        });

        $teamMembers = TeamMember::orderBy('sort_order')->orderBy('id')->get()->map(function ($m) {
            return [
                'id' => $m->id,
                'name' => $m->name,
                'role' => $m->role,
                'division' => $m->division,
                'image' => $m->image,
                'status' => $m->status,
                'bio' => $m->bio,
                'experience' => $m->experience,
                'badge' => $m->badge,
                'skills' => $m->skills ?? [],
                'links' => $m->links ?? [],
            ];
        });

        $studioInfo = StudioSetting::get('studio_info', [
            'name' => 'Lab AR',
            'legalName' => 'Lab AR Innovations Ltd.',
            'slogan' => 'Innovating the Future: Pioneering Extended Reality & Game Development',
            'mission' => 'Empowering Innovation with Cutting-Edge Technology. Explore our expertise in Software Development, Extended Reality (XR), Game Development, and next-gen digital solutions tailored for your success.',
            'tagline' => 'Best IT & XR Innovation Company in Bangladesh',
            'address' => 'E-14/X, ICT Tower (14th Floor), Agargaon, Dhaka - 1207, Bangladesh',
            'phone' => '+880 1834-219770',
            'phoneRaw' => '+8801834219770',
            'email' => 'contact@lab-ar.xyz',
            'website' => 'https://www.lab-ar.xyz',
            'coords' => [
                'lat' => 23.7774,
                'lng' => 90.3789,
                'landmark' => 'ICT Tower, Agargaon, Dhaka',
            ],
            'hours' => 'Sunday - Thursday: 10:00 AM - 7:00 PM (BST)',
            'status' => 'ONLINE - ACCEPTING Q3-Q4 COMMISSIONS',
        ]);

        $stats = StudioSetting::get('stats', [
            ['label' => 'XR & 3D Deployments', 'value' => '45+', 'suffix' => 'Projects'],
            ['label' => 'Total Users Engaged', 'value' => '1.2M+', 'suffix' => 'Global Reach'],
            ['label' => 'Client Retention Rate', 'value' => '99.4%', 'suffix' => 'Satisfaction'],
            ['label' => 'Hardware Ecosystems', 'value' => '12+', 'suffix' => 'VR/AR/Motion'],
        ]);

        $techStack = [
            [
                'category' => 'Game & XR Engines',
                'items' => [
                    ['name' => 'Unity 3D', 'level' => 96, 'badge' => 'C# / DOTS', 'type' => 'Game & VR'],
                    ['name' => 'Unreal Engine 5', 'level' => 92, 'badge' => 'Nanite / Lumen', 'type' => 'AAA Graphics'],
                    ['name' => 'Three.js / WebGL', 'level' => 94, 'badge' => 'GLSL / Shaders', 'type' => 'Browser 3D'],
                    ['name' => 'WebXR & OpenXR', 'level' => 90, 'badge' => 'Spatial API', 'type' => 'Headset Native'],
                ],
            ],
            [
                'category' => 'Modern Frontend & Mobile',
                'items' => [
                    ['name' => 'React.js', 'level' => 95, 'badge' => 'Modern SPA / Next', 'type' => 'Frontend'],
                    ['name' => 'Inertia.js', 'level' => 94, 'badge' => 'Monolith / Modern', 'type' => 'Full-Stack'],
                    ['name' => 'Flutter', 'level' => 91, 'badge' => 'iOS & Android', 'type' => 'Mobile XR'],
                    ['name' => 'Vue.js', 'level' => 88, 'badge' => 'Composition API', 'type' => 'Frontend'],
                ],
            ],
            [
                'category' => 'Backend & Enterprise Systems',
                'items' => [
                    ['name' => 'Laravel 12', 'level' => 96, 'badge' => 'PHP 8.3 / Queues', 'type' => 'Backend Core'],
                    ['name' => '.NET Core', 'level' => 90, 'badge' => 'C# / Microservices', 'type' => 'Enterprise'],
                    ['name' => 'Python / FastAPI', 'level' => 89, 'badge' => 'AI / Vision Models', 'type' => 'Machine Learning'],
                    ['name' => 'Node.js', 'level' => 92, 'badge' => 'Real-Time Sockets', 'type' => 'Async Servers'],
                ],
            ],
            [
                'category' => 'Sensors, Hardware & Vision',
                'items' => [
                    ['name' => 'Microsoft Kinect SDK', 'level' => 95, 'badge' => 'Skeletal Tracking', 'type' => 'Motion Input'],
                    ['name' => 'Meta Quest 3 / Pro', 'level' => 93, 'badge' => 'Hand Tracking', 'type' => 'VR Hardware'],
                    ['name' => 'Apple Vision Pro / VisionOS', 'level' => 87, 'badge' => 'Spatial UI', 'type' => 'Spatial Computing'],
                    ['name' => 'OpenCV & MediaPipe', 'level' => 91, 'badge' => 'Neural FaceMesh', 'type' => 'Computer Vision'],
                ],
            ],
        ];

        return Inertia::render('Home', [
            'services' => $services,
            'projects' => $projects,
            'techStack' => $techStack,
            'clients' => $clients,
            'teamMembers' => $teamMembers,
            'stats' => $stats,
            'studioInfo' => $studioInfo,
        ]);
    }

    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'company' => 'nullable|string|max:100',
            'service' => 'required|string',
            'budget' => 'nullable|string',
            'timeline' => 'nullable|string',
            'message' => 'required|string|min:10|max:3000',
        ]);

        Inquiry::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'company' => $validated['company'] ?? null,
            'service' => $validated['service'],
            'budget' => $validated['budget'] ?? null,
            'timeline' => $validated['timeline'] ?? null,
            'message' => $validated['message'],
            'status' => 'NEW',
        ]);

        return back()->with('flash', [
            'type' => 'success',
            'message' => 'Thank you, ' . $validated['name'] . '! Your XR consultation inquiry has been transmitted to Lab AR engineers at ICT Tower, Dhaka. We will respond within 4 business hours.',
        ]);
    }
}
