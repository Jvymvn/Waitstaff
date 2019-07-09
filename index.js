'use strict';

const state = {
    subtotal: 0,
    tip: 0,
    total: 0,
}

function watchForm() {
    $('#meal-form').submit(function (event) {
        event.preventDefault();
        const mealPrice = parseFloat($('.meal-price').val());
        let taxRate = parseFloat($('.tax-rate').val());
        let tipRate = parseFloat($('.tip-percentage').val());
        // console.log(typeof mealPrice);
        // console.log(typeof taxRate);
        // console.log(typeof tipRate);
        // calculateTaxRate(mealPrice, taxRate, tipRate);
        if (!mealPrice) {
            throw ('Must enter meal price');
        } else {
            if (!taxRate) {
                throw ('Must enter tax rate');
            }
            if (!tipRate) {
                tipRate = 0;
            }
            updateState(mealPrice, taxRate, tipRate);
            render();
        }
    });
}

function updateState(price, tax, tip) {
    state.subtotal = (price * tax).toFixed(2);
    state.tip = (tip).toFixed(2);
    state.total = (parseFloat(state.subtotal) + parseFloat(state.tip)).toFixed(2);
}



const render = () => {
    $('#customer-charges').html(
        `
        <section class="waitstaff-section">
        <h2>Customer Charges</h2>
        <p class="subtotal-amount">Subtotal: ${state.subtotal}</p>
        <p class="tip-amount">Tip: ${state.tip}</p>
        <p class="total-amount">Total: ${state.total}</p>
        </section>
        `
    )
}

const reset = () => {
    $('#reset-btn').on('click', e => {
        e.preventDefault();
        state.subtotal = 0;
        state.tip = 0;
        state.total = 0;
        render();
    })
}

function handleWait() {
    render();
    watchForm();
    reset();
}



$(handleWait);