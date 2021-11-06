const Employee = require('../lib/Employee')

test("can get name via get name function?", () => {
    const name = "Stan"
    const e = new Employee(name)
    expect(e.name).toBe(name)
});

test('can get employee id', () => {
    const 
})