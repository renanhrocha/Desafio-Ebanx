let accounts = {};

exports.reset = () => {
    accounts = {};
};

exports.getBalance = (accountId) => {
    if (accounts[accountId]) {
        return accounts[accountId].balance;
    }
    return null;
};

exports.deposit = (destination, amount) => {
    if (!accounts[destination]) {
        accounts[destination] = { id: destination, balance: 0 };
    }
    accounts[destination].balance += amount;
    return { destination: accounts[destination] };
};

exports.withdraw = (origin, amount) => {
    if (accounts[origin]) {
        accounts[origin].balance -= amount;
        return { origin: accounts[origin] };
    }
    return null;
};

exports.transfer = (origin, destination, amount) => {
    if (accounts[origin]) {
        this.withdraw(origin, amount);
        this.deposit(destination, amount);
        return {
            origin: accounts[origin],
            destination: accounts[destination]
        };
    }
    return null;
};