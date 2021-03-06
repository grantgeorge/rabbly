
function wpl_numKeys(obj)
{
    var count = 0;
    for(var key in obj)
    {
		if (obj.hasOwnProperty(key)) {
 
			for(var key_b in obj[key])
			{		
				//alert ('1');
				count++;
			}
		
		}
      
    }
    return count;
}
/* Count number of session visits */
function countProperties(obj) {
    var count = 0;

    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            ++count;
    }

    return count;
}
/* build tracking uid */
function generate_wp_leads_uid(length) {
	
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

/* build tracking uid */
function generate_session_id(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}


/* Function for adding minutes to current time */
function add_page_timeout(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};
/* Query String for utm params 

// Query String Stuff
    var p  = jQuery("pre"),
        result = "",
        urlParams = {};

    (function () {
        var e,
            d = function (s) { return decodeURIComponent(s).replace(/\+/g, " "); },
            q = window.location.search.substring(1),
            r = /([^&=]+)=?([^&]*)/g;

        while (e = r.exec(q)) {
            if (e[1].indexOf("[") == "-1")
                urlParams[d(e[1])] = d(e[2]);
            else {
                var b1 = e[1].indexOf("["),
                    aN = e[1].slice(b1+1, e[1].indexOf("]", b1)),
                    pN = d(e[1].slice(0, b1));
              
                if (typeof urlParams[pN] != "object")
                    urlParams[d(pN)] = {},
                    urlParams[d(pN)].length = 0;
                
                if (aN)
                    urlParams[d(pN)][d(aN)] = d(e[2]);
                else
                    Array.prototype.push.call(urlParams[d(pN)], d(e[2]));

            }
        }
    })();

    if (JSON) {
        result = JSON.stringify(urlParams, null, 4);

          for (var k in urlParams) {
                if (typeof urlParams[k] == "object") {
                  for (var k2 in urlParams[k])
                    jQuery.cookie(k2, urlParams[k][k2], { expires: 365 });
					console.log(k2);
					console.log(urlParams[k][k2]);
                } 
                else {
                    jQuery.cookie(k, urlParams[k], { expires: 365 }); }
					console.log(k);
					console.log(urlParams[k]);
              }

    }
 */   

//alert(window.location);

// Unique WP Lead ID
var wp_lead_uid_val =  generate_wp_leads_uid(35);
//alert(wplft.ip_address);
if(jQuery.cookie("wp_lead_uid") === null) { 
    jQuery.cookie("wp_lead_uid", wp_lead_uid_val, { path: '/', expires: 365 });
}

/* define vars */
var referrer = document.referrer;
var current_page =  window.location.href;
var current_page_parts = current_page.split('#');
current_page = current_page_parts[0];

var parts = location.hostname.split('.');
var subdomain = parts.shift();
var upperleveldomain = parts.join('.'); 
var data_block = jQuery.parseJSON(jQuery.cookie('user_data_json'));
// Date Data
var date = new Date(); 
var datetime = dateFormat(date, "yyyy-mm-dd hh:MM:ss");

var the_time_out = add_page_timeout(date, .1);

var lead_uid = jQuery.cookie("wp_lead_uid");
var lead_id = jQuery.cookie("wp_lead_id");
var lead_email = jQuery.cookie("wp_lead_email");



/* Start LocalStorage */
var trackObj = jQuery.totalStorage('cpath');

if (typeof trackObj =='object' && trackObj)
{
	session_count = countProperties(trackObj);
	// If session is past timout limit
	if(!jQuery.cookie( "lead_session_expire") ) {
		var session_id = generate_session_id(11);
        console.log("Start New Tracking Session");
   		// Start New Tracking Block
   		trackObj.push({ 
			 session: session_count + 1,
			 session_id: session_id,
			 pageviews: [{id: 1, 
								current_page: current_page,
								post_id : wplft.post_id,
								timestamp: datetime,  
								referrer: referrer,  
								original_referrer: referrer 
								}],
				last_activity: date, // Last movement	
					  timeout: the_time_out, // Thirty minute timeout
					 lead_uid: lead_uid,	  
					  lead_id: lead_id,
				   lead_email: lead_email,
				   lead_ip_address: wplft.ip_address
				});
     } else {
	    // If session still active, do this
	    session_count = countProperties(trackObj);
	    number = parseInt(session_count) - 1;	
		var new_count = trackObj[number].pageviews.length;
		console.log(new_count);
		if(jQuery.cookie('wp_lead_uid')){
		    trackObj[number].lead_uid = lead_uid;
		}
		if(jQuery.cookie('wp_lead_id')){
		    trackObj[number].lead_id = lead_id;
		}
		if(jQuery.cookie('wp_lead_email')){
		    trackObj[number].lead_email = lead_email;
		}
		trackObj[number].pageviews.push(
			{ id : new_count+1,  current_page: current_page, post_id : wplft.post_id, timestamp: datetime, referrer: referrer}
		)
	}
} 
else
{	
	// Create initial tracking block
	var trackObj = new Array();
	var session_id = generate_session_id(11);
	trackObj.push({ 
					session: 1,
					session_id: session_id,
					pageviews: [{id: 1, 
								current_page: current_page,
								post_id : wplft.post_id,
								timestamp: datetime,  
								referrer: referrer,  
								original_referrer: referrer 
								}],	
				last_activity: date, // Last movement	
					timeout: the_time_out, // Thirty minute timeout
					lead_uid: lead_uid,	  
					lead_id: lead_id,
					lead_email: lead_email,
				    lead_ip_address: wplft.ip_address
				}
			);
	
}
jQuery.totalStorage('cpath', trackObj);

// Page View Object: Sessionless and clears on form submittions
var pageviewObj = jQuery.totalStorage('page_views');
var current_page_id = wplft.post_id;
if (typeof pageviewObj =='object' && pageviewObj)
{
	    // If pageviewObj exists, do this
	    var page_seen = pageviewObj[current_page_id];
	    if(typeof(page_seen) != "undefined" && page_seen !== null) {   
		    var view_count = pageviewObj[current_page_id].length - 1;
		    var last_view = pageviewObj[current_page_id][view_count];
	
		    var thirty_second_timeout = new Date(last_view).getTime() + 30*1000;
			var thirty_second_timeout_formatted = dateFormat(thirty_second_timeout, "yyyy-mm-dd hh:MM:ss");

			var wait_time = Math.abs(Date.parse(last_view) - Date.parse(thirty_second_timeout_formatted)) // output timeout time 30sec;
			var time_check = Math.abs(Date.parse(last_view) - Date.parse(datetime));
			//console.log(wait_time);
			//console.log(time_check);
			if (time_check > wait_time ){
				console.log('time out happened');
				pageviewObj[current_page_id].push(datetime);
				// run Ajax page view saving here.
			} else {
				console.log('30 sec timeout not done: ' + (wait_time - time_check)*.001  + " seconds left");
			}
			
		} else {
			pageviewObj[current_page_id] = [];
			pageviewObj[current_page_id].push(datetime);	
		}

} else {	
// Create initial pageviewObj
	var pageviewObj =  {};
	pageviewObj[current_page_id] = [];
	pageviewObj[current_page_id].push(datetime);
									
}

jQuery.totalStorage('page_views', pageviewObj);
// console.log(JSON.stringify(pageviewObj)) // output the pages viewed


/* End local storage */

/* Start Legacy Cookie Storage */
if (typeof data_block =='object' && data_block)
{
	var count = wpl_numKeys(data_block);
	data_block.items.push(
		{ id : count+1,  current_page: current_page, timestamp: datetime, referrer: referrer}
	);
	
	jQuery.cookie('user_data_json', JSON.stringify(data_block),  { expires: 1, path: '/' });
} 
else
{
	data_block = {items: [
		{id: '1', current_page: current_page,timestamp: datetime,  referrer: referrer,  original_referrer: referrer},
	]};
	
	jQuery.cookie('user_data_json', JSON.stringify(data_block), { expires: 1, path: '/' });
}
/* End Legacy Cookie Storage */