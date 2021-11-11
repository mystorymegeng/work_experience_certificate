pragma solidity >=0.7.0 <0.9.0;

contract Certificate {

    address private owner;

    struct CerInfo {
        string name;
        string sername;
        string dateOfBirth;
        string company;
        string workFrom;
        string workTo;
        string position;
        string description;
        string oldHash;
    }

    struct User {
        string company; 
    }

    mapping(address => User) users;

    CerInfo [] public listCer;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require( msg.sender == owner, "Only owner can use this function" );
        _;
    }

    modifier onlyUser {
        bool check = keccak256(abi.encodePacked(users[msg.sender].company)) == keccak256(abi.encodePacked(""));
        require( !check, "Only user can use this function" );
        _;
    }
    
    function test(address user) public view returns (bool) {
        bool check = keccak256(abi.encodePacked(users[user].company)) == keccak256(abi.encodePacked(""));
        return check;
    }

    function addUser( address user, string memory company ) public onlyOwner {
        users[user] = User({company: company});
    }

    function deleteUser( address user ) public onlyOwner {
        delete users[user];
    }

    function addCer( string memory name, string memory sername, string memory dateOfBirth, string memory company, string memory workFrom, 
                     string memory workTo, string memory position, string memory description )  public onlyUser {
        listCer.push(
            CerInfo({
                name: name,
                sername: sername,
                dateOfBirth: dateOfBirth,
                company: company,
                workFrom: workFrom,
                workTo: workTo,
                position: position,
                description: description,
                oldHash: "-"
            })
        );
    }

    function updateCer ( string memory name, string memory sername, string memory dateOfBirth, string memory company, string memory workFrom, 
                         string memory workTo, string memory position, string memory description, string memory oldHash ) public onlyUser {
        listCer.push(
            CerInfo({
                name: name,
                sername: sername,
                dateOfBirth: dateOfBirth,
                company: company,
                workFrom: workFrom,
                workTo: workTo,
                position: position,
                description: description,
                oldHash: oldHash
            })
        );
    } 
    
    function getAllCer() public view returns (CerInfo[] memory) {
        return listCer;
    }
    
    function getCer(uint i) public view returns (CerInfo memory) {
        return listCer[i];
    }
    
}