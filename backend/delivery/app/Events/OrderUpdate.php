<?php
namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Broadcasting\PrivateChannel;

class OrderUpdate implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $order;

  public function __construct($order)
  {
      $this->order = $order;
  }

  public function broadcastOn()
  {
    return new PrivateChannel('order.'.$this->order['id']);
  }

  public function broadcastAs()
  {
    return 'order.update';
  }
}