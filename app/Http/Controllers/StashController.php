<?php


namespace App\Http\Controllers;

use App\Balance;
use App\Http\Requests\StashAddBalance;
use App\Http\Requests\StashShow;
use App\Http\Requests\StashStore;
use App\Http\Requests\StashUpdate;
use App\Http\Resources\StashResource;
use App\Stash;
use App\User;
use Illuminate\Http\Request;

class StashController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    protected function checkPermission(Stash $stash)
    {
        if (auth()->user()->id !== $stash->user_id) {
            # TODO Translate
            return response()->json(['error' => 'You can only edit your own stashes.'], 403);
        }

        return true;
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
        $data = $request->validated();

        $stash = new Stash();
        $stash->user_id = auth()->user()->id;
        $stash->label = $data['label'];
        $stash->type = $data['type'];
        $stash->save();

        return response()->json([
            'stash' => new StashResource($stash)
        ]);
    }

    public function show(Stash $stash)
    {
        $perm = $this->checkPermission($stash);
        if ($perm !== true) {
            return $perm;
        }

        return response()->json([
            'stash' => new StashResource($stash)
        ]);
    }

    public function update(StashUpdate $request, Stash $stash)
    {
        $perm = $this->checkPermission($stash);
        if ($perm !== true) {
            return $perm;
        }

        $stash->update($request->validated());

        return response()->json([
            'stash' => new StashResource($stash)
        ]);
    }

    public function destroy(Stash $stash)
    {
        $perm = $this->checkPermission($stash);
        if ($perm !== true) {
            return $perm;
        }

        $id = $stash->id;
        $stash->delete();

        return response()->json(['id' => $id]);
    }

    public function types()
    {
        return response()->json([
            'types' => array_keys(Stash::TYPES),
        ]);
    }

    public function addBalance(StashAddBalance $request, Stash $stash)
    {
        $perm = $this->checkPermission($stash);
        if ($perm !== true) {
            return $perm;
        }

        $data = $request->validated();

        $balance = new Balance();
        $balance->stash_id = $stash->id;
        $balance->currency = $data['currency'];
        $balance->amount = $data['amount'];
        $balance->save();

        return response()->json([
            'stash' => new StashResource($stash),
        ]);
    }
}
