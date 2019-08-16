
## 更新代码
    
    git pull origin 分支名
    
    假如当前项目有做文件修改, 则需要先 commit, 把代码提交到本地

## 提交代码

### [有创建新文件时]
    
    git add . 将当前项目下所有修改的
    git commit -m "注释"

### [未创建新文件]

    git commit -am "注释" [-a 会默认把当前修改的文件]

## 推代码

    git push origin 分支名
    推代码前有两个注意事项
    1: 检查当前项目是否有修改
    2: 如果有修改则需要执行 commit 操作， 没有则跳过
    3: 更新远程仓库, 将本地仓库与远处仓库保持同步

## 检查当前项目

    git status

## 创建分支 
    
    git branch 分支名

## 切换分支

    git checkout 分支名

## 创建并切换

    git checkout -b 分支名 [在当前分支上创建一个新分支并切换到新分支]

## 合并代码

    假如当前有 2 个分支分别为 A and B
    需求： 把 A 分支代码合并到 B 分支

    git checkout B [切换到 B 分支]
    git merge A    [将 A 分支代码合并到 B 分支]  把别人的代码拉过来
