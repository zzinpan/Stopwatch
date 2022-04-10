const Stopwatch = require("../dist/umd/Stopwatch");

test('객체 생성 테스트', () => {
    
    const stopwatch = new Stopwatch();
    expect( stopwatch instanceof Stopwatch ).toBe( true );

});

test('start', () => {
    
    const stopwatch = new Stopwatch();
    expect( stopwatch.start() === true ).toBe( true );

});