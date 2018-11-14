var options = {
    valueNames: ['name', 'born']
};
// These items will be added to the list on initialization.
var values = [
    {
        name: 'Jonas Arnklint',
        born: 1985
    },
    {
        name: 'Martina Elm',
        born: 1986
    }
];
var userList = new List('example-list', options, values);
// It's possible to add items after list been initiated
userList.add({
    name: 'Gustaf Lindqvist',
    born: 1983
});
