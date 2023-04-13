<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class Admin_accFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'Fname'=> substr($this->faker->lastName(),0 ,10),
            'Lname'=> substr($this->faker->name(),0 ,10),
            'Email'=> substr($this->faker->companyEmail(),0 ,30),
            'Tele'=> substr($this->faker->phoneNumber(),0 ,13),
            'password' => substr($this->faker->password(),0 ,20),
        ];
    }
}
