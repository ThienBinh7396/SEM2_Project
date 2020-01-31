{

	"rules": {
		"users": {
			"$uid": {
				".read": "auth != null ",
				".write": "auth != null ",
				"friends" :{
					"$fid": {
						"details": {
							".read": "auth != null ",
							".write": "auth != null "
						},
						"messages" :{
							".read":  "auth.uid == $uid || root.child('users').child($uid).child('friends').child(auth.uid).exists()",
							".write": "auth.uid == $uid || root.child('users').child($uid).child('friends').child(auth.uid).exists()",          
							".indexOn" : ["time"],
						} 
					}
				},    	

			}  
		},
		"rooms": {
			".read": "auth != null ",
			".write": "auth != null ",
		}  
	}
}