import $ from 'jquery';

export default function ajax(opts) {
  return new Promise((resolve, reject) => {
    opts.success = resolve;
    opts.error = reject;
    $.ajax(opts);
  });
}