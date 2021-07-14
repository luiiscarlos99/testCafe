fixture("Hover Fixture")
.page("https://devexpress.github.io/testcafe/example/");

test('Hover test', async t => {
    await t
        .setTestSpeed(0.1)
        .hover('input#populate');
});