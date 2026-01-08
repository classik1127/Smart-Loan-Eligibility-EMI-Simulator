class LoanApplicant {
  constructor(name, income, loan, years, job) {
    this.name = name;
    this.income = income;
    this.loan = loan;
    this.years = years;
    this.job = job;
  }

  monthlyEMI() {
    const months = this.years * 12;
    return (this.loan / months).toFixed(2);
  }

  isEligible() {
    if (this.job === "student" && this.income < 100000) return false;
    if (this.loan > this.income * 20) return false;
    return true;
  }
}

const btn = document.getElementById("btn");

btn.onclick = function () {
  const nameInput = document.getElementById("name").value.trim();
  const income = Number(document.getElementById("income").value);
  const loan = Number(document.getElementById("loan").value);
  const years = Number(document.getElementById("years").value);
  const isStudent = document.getElementById("student").checked;
  const isWorker = document.getElementById("worker").checked;
  const result = document.getElementById("result");

  if (!nameInput || !income || !loan || !years || (!isStudent && !isWorker)) {
    result.textContent = "Please complete all fields.";
    result.style.color = "red";
    return;
  }

  const job = isStudent ? "student" : "worker";
  const name =
    nameInput.charAt(0).toUpperCase() + nameInput.slice(1).toLowerCase();

  const user = new LoanApplicant(name, income, loan, years, job);

  if (!user.isEligible()) {
    result.style.color = "red";
    result.textContent = "Loan application rejected due to risk factors.";
    return;
  }

  result.style.color = "green";
  result.innerHTML = `
    Applicant: ${user.name}<br>
    Status: Approved<br>
    Monthly EMI: ₦${user.monthlyEMI()}
  `;
};
