<?php
class ObjectiveSizing extends Sizing
{
	__construct(array $array) {
		if (isset($array['id'])) {
			$this->id = $array['id'];
		}
		if (isset($array['id'])) {
			$this->user_id = $array['user_id'];
		}
		
		$this->band = $array['band'];
		$this->cupsize = $array['cupsize'];
		$this->bottom = $array['bottom'];
	}
}