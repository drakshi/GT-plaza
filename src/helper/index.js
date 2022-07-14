import moment from "moment";

export const CapitalizeFirstLetter = (str) => {
    return str.length ? str.charAt(0)?.toUpperCase() + str.slice(1) : str
};

export const formatCardNumber = value => {
    const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g
    const onlyNumbers = value.replace(/[^\d]/g, '')

    return onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
        [$1, $2, $3, $4].filter(group => !!group).join(' ')
    )
};

export function validatePassword(password) {
    let letter = /[a-zA-Z]/;
    let number = /[0-9]/;
    let valid = number.test(password) && letter.test(password); //match a letter _and_ a number
    return (valid && password.length >= 8) ? null : 'Password must be alphanumeric and must be at least 8 characters';
}

export function truncateString(str, num) {
    if (!str) {
        return '';
    }
    if (str.length > num) {
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
}

export function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const convertToSlug = s =>  {
    return s ?  s.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '') : null;
};

export const formatDate = value => {
    return moment(value).format('DD-MM-YYYY');
};

export const formatUsDate = string => {
    var options = { month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
};

export const currencyFormat = string => {
    return '$' + string.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const datepickerDate = value => {
    return moment(value).format('MM/DD/YYYY');
}

export const sortArray = array => {
    const myData = [].concat(array)
        .sort((a, b) => a.distance > b.distance ? 1 : -1)
    return myData;
};

export const formatUpdateTime = string => {
    return moment(string).format("DD-MM-YYYY hh:mm a").toUpperCase();
};

export const formatOrderTime = string => {
    return moment(string).format("hh:mm a").toUpperCase();
};

export const formatSimpleDate = value => {
    return moment(value).format('dddd, MMMM Do YYYY');
};

export const imageOptimization = (url,size) => {
    return "https://pixboost.com/api/2/img/"+url+"/resize?size="+size+"&auth=MzA5ODU4ODUwMA__";
};


export const EventEmitter = {
    _events: {},
    dispatch: function (event, data) {
        if (!this._events[event]) return; // no one is listening to this event
        for (var i = 0; i < this._events[event].length; i++)
            this._events[event][i](data);
    },
    subscribe: function (event, callback) {
        if (!this._events[event]) this._events[event] = []; // new event
        this._events[event].push(callback);
    }
    // note that we do not handle unsubscribe here
};
