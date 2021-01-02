<?php
class Choon
{
	protected $Conn;

	public function __construct($Conn)
	{
		$this->Conn = $Conn;
	}

	public function getAllChoons()
	{
		$query = "SELECT * FROM choons";
		$stmt = $this->Conn->prepare($query);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
}
