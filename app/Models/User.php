<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function roles(){
        return $this->belongsToMany(Role::class,"role_user","user_id","role_id");
    }

     //verification de role des utilisateurs
     public function hasRole($role){
        return $this->roles()->where("nom",$role)->first() !==null;
    }
    // public function hasAnyRole($roles){
    //     return $this->roles()->whereIn("nom",$roles)->first() !==null;
    // }

    // public function getAllRoleNamesAttribute(){
    //     return $this->roles->implode("nom" , "|");
    // }

    public function permissions(){
        return $this->belongsToMany(Permission::class,"user_permission","user_id","permission_id");
    }
}
