const Stopwatch = require("../dist/Stopwatch");

test('객체 생성 테스트', () => {
    
    const stopwatch = new Stopwatch();
    expect( stopwatch instanceof Stopwatch ).toBe( true );

});