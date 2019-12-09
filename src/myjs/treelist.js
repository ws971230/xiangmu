function tree(info, pid) {
    let data = [];
    for (let i in info) {
        if (info[i].pid == pid) {
            var x = {
                value: info[i]._id,
                label: info[i].title,
                children: tree(info, info[i]._id)
            };
            // 没有子权限 删除 children
            if (x.children.length == 0) {
                delete x.children;
            }
            data.push(x);
        }
    }
    return data;
}
export default tree