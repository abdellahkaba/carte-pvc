<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Permission extends Model
{
    use HasFactory;
    public function users(){
        return $this->belongsToMany(User::class,"user_permission","permission_id","user_id");
    }
}
