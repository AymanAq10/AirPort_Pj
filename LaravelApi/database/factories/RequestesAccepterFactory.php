<?php

namespace Database\Factories;

use App\Models\Requests;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Requeste_accepter>
 */
class RequestesAccepterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'Acc_id' => Requests::factory(),
            'RequDateAcc' => $this->faker->date()
        ];
    }
}
