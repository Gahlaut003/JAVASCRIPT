class Person{

    constructor(fname,lname,gender){
        this.first_name = fname;
        this.last_name = lname;
        this.gender = gender;

    }

    demo(){
        fetch('http://localhost:8000/api/items')
        .then(response => response.json())
        .then(data => {
            // Process the response data
            console.log('Items:', data);
        })
        .catch(error => console.error('Error:', error));
    }
    print(){
        console.log(this.first_name,this.last_name,this.gender);
    }

    Create(){
        const data = JSON.stringify({ 'first_name': 'test11' ,'last_name':'lanme111','gender':'male'});
    
        // Make an AJAX POST request to insert the record
        fetch('http://localhost:8000/api/item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => {
            if (response.ok) {
                console.log('Record inserted successfully');
            } else {
                throw new Error('Failed to insert record');
            }
        })
        .catch(error => console.error('Error:', error));
    }

    Update(){

    }

    Delete(){


    }

}

const newPerson = new Person('TestFName','testLName','Female');

// newPerson.print();
// newPerson.demo();
newPerson.Create();
