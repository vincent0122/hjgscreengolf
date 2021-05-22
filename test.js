const member_list = [
	{id: 1, name: "이지성", handy: -10, result: 32},
	{id: 2, name: "임진강", handy: 5, result: 5},
	{id: 3, name: "이만영", handy: -2, result: 10},
];

member_list.sort(function (a, b) {
	var nameA = a.result;
	var nameB = b.result;
	if (nameA < nameB) {
		return -1;
	}
	if (nameA > nameB) {
		return 1;
	}
	return 0;
});

console.log(member_list);
