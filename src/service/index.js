const PATH = '../../php'
/* global $ */


// get
export function getMs () { return $.post(`${PATH}/main.php?cmd=getMs`).then(res => JSON.parse(res)) }

export function getRm () { return $.post(`${PATH}/main.php?cmd=getRm`).then(res => JSON.parse(res)) }


// ins
export function insMs (data) { return $.post(`${PATH}/main.php?cmd=insMs`, JSON.stringify(data)).then(getMs) }

export function insRm (data) { return $.post(`${PATH}/main.php?cmd=insRm`, JSON.stringify(data)).then(getRm) }


// upd
export function updMs (data) { return $.post(`${PATH}/main.php?cmd=updMs`, JSON.stringify(data)).then(getMs) }

export function updRm (data) { return $.post(`${PATH}/main.php?cmd=updRm`, JSON.stringify(data)).then(getRm) }


// del
export function delMs (data) { return $.post(`${PATH}/main.php?cmd=delMs`, JSON.stringify(data)).then(getMs) }

export function delRm (data) { return $.post(`${PATH}/main.php?cmd=delRm`, JSON.stringify(data)).then(getRm) }
