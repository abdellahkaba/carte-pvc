<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends Model
{
    use HasFactory;

    public function users(){
        return $this->belongsToMany(User::class,"role_user","role_id","user_id");
    }
}
