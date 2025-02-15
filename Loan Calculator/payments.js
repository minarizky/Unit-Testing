let billAmtInput = document.getElementById('billAmt');
let tipAmtInput = document.getElementById('tipAmt');
let paymentForm = document.getElementById('paymentForm');

let paymentTbody = document.querySelector('#paymentTable tbody');
let summaryTds = document.querySelectorAll('#summaryTable tbody tr td');

let allPayments = {};
let paymentId = 0;

paymentForm.addEventListener('submit', submitPaymentInfo);

function submitPaymentInfo (evt) {
    if (evt) evt.preventDefault();

    let curPayment = createCurPayment();

    if (curPayment) {
        paymentId += 1;

        allPayments['payment' + paymentId] = curPayment;

        appendPaymentTable(curPayment);
        updateServerTable();
        updateSummary();

        billAmtInput.value = '';
        tipAmtInput.value = '';
    }
}

function createCurPayment() {
    let billAmt = billAmtInput.value;
    let tipAmt = tipAmtInput.Value;

    if (billAmt === '' || tipAmt === '') return;

    if (Number(billAmt) > 0 && Number(tipAmt) >= 0) {
        return {
            billAmt: billAmt,
            tipAmt: tipAmt,
            tipPercent: calculateTipPercent(billAmt, tipAmt),
        }
    }
}

function appendPaymentTable(curPayment) {
    let newTr = document.createElement('tr');
    newTr.id = 'payment' + paymentId;

    appendTd(newTr, '$' + curPayment.billAmt);
    appendTd(newTr, '$' + curPayment.tipAmt);
    appendTd(newTr, '%' + curPayment.tipPercent);

    appendDeleteBtn(newTr);
}

function updateSummary() {
    let tipPercentAvg = sumPaymentTotal('tipPercent') / Object.keys(allPayments).length;

    summaryTds[0].innerHTML = '$' + sumPaymentTotal('billAmt');
    summaryTds[1].innerHTML = '$' + sumPaymentTotal('tipAmt');
    summaryTds[2].innerHTML = Math.round(tipPercentAvg) + '%';
}