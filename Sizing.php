<?php
class Sizing
{
	//persistence properties
	private $id = -1;
	private $user_id;
	
	//subjective properties
	private $size;
	private $chest;
	private $hips;
	private $cup;
	
	//objective properties
	private $band;
	private $cupsize;
	private $bottom;
	
	__construct( array $array; ) {
		if (isset($array['id'])) {
			$this->id = $array['id'];
		}
		if (isset($array['id'])) {
			$this->user_id = $array['user_id'];
		}
		
		$this->size = $array['size'];
		$this->chest = $array['chest'];
		$this->hips = $array['hips'];
		$this->cup = $array['cup'];
		
		if (! isset($array['band'])) {
			$this->calculateObjective($this->size, $this->chest, $this->hips, $this->cup);
		}
	}
	//void
	calculateObjective($size, $chest, $hips, $cup) {
		switch ($cup) {
			case 1:
				$this->cupsize = 'A';
				break;
			case 2:
				$this->cupsize = 'B';
				break;
			case 3:
				$this->cupsize = 'C';
				break;
			case 4:
				$this->cupsize = 'D';
				break;
		}	
		switch ($size) {
			case 1:
				//translate subjectives into objectives
				switch ($chest) {
					case 1:
						$this->band = 30;
						break;
					case 2:
						$this->band = 32;
						break;						
					case 3:
						$this->band = 34;
						break;					
				}
				
				switch ($hips) {
					case 1:
						$this->bottom = 'XS';
						break;
					case 2:
						$this->bottom = 'S';
						break;						
					case 3:
						$this->bottom = 'M';
						break;					
				}
				
				break;
			case 2:
				//translate subjectives into objectives
				switch ($chest) {
					case 1:
						$this->band = 32;
						break;
					case 2:
						$this->band = 34;
						break;						
					case 3:
						$this->band = 36;
						break;					
				}
				
				switch ($hips) {
					case 1:
						$this->bottom = 'S';
						break;
					case 2:
						$this->bottom = 'M';
						break;						
					case 3:
						$this->bottom = 'L';
						break;					
				}
				break;
			case 3:
				//translate subjectives into objectives
				switch ($chest) {
					case 1:
						$this->band = 34;
						break;
					case 2:
						$this->band = 36;
						break;						
					case 3:
						$this->band = 38;
						break;					
				}
				
				switch ($hips) {
					case 1:
						$this->bottom = 'M';
						break;
					case 2:
						$this->bottom = 'L';
						break;						
					case 3:
						$this->bottom = 'XL';
						break;					
				}
				break;
		}
	}
}