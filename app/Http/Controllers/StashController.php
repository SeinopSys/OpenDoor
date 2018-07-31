<?php


namespace App\Http\Controllers;

use App\Http\Requests\StashStore;
use App\Stash;
use App\Http\Resources\StashResource;
use App\User;


class StashController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        /** @var $user User */
        $user = auth()->user();
        return response()->json([
            'stashes' => StashResource::collection($user->stashes()->get()),
        ]);
    }

    public function store(StashStore $request)
    {
        $stash = new Stash();
        $stash->user_id = $request->user()->id;
        $stash->label = $request->label;
        $stash->type = $request->type;

        return response()->json([
            'stash' => new StashResource($stash)
        ]);
    }

    public function show(Stash $stash)
    {
        return response()->json([
            'stash' => new StashResource($stash)
        ]);
    }

    public function update(Request $request, Stash $stash)
    {
        if ($request->user()->id !== $stash->user_id) {
            # TODO Translate
            return response()->json(['error' => 'You can only edit your own stashes.'], 403);
        }

        $stash->update($request->only(['label']));

        return response()->json([
            'stash' => new StashResource($stash)
        ]);
    }

    public function destroy(Stash $stash)
    {
        $stash->delete();

        return response()->json(null, 204);
    }

    public function types()
    {
        return response()->json([
            'types' => array_keys(Stash::STASH_TYPES),
        ]);
    }
}
