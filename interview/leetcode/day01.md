## 题目

* 给定一个 n × n 的二维矩阵表示一个图像。将图像顺时针旋转 90 度。
* 说明：
* 你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。

```js 
/**
 * 自答
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    let len1 = matrix.length;
    let len2 = matrix[0].length;
    // 遍历数组，提取每个子数组的第一个元素赋予到第len1+1行，循环
    for (let j = 0; j < len2; j++) {
        matrix[len1+j] = []
        for (let i = 0; i < len1; i++) {
            matrix[len1+j].unshift(matrix[i][j])
        }
    }
    matrix = matrix.splice(0,len1)
    return matrix
};
```

```js
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    let len1 = matrix.length - 1;
    let len2 = 0;

    // let temp = matrix[0][0];
    // matrix[0][0] = matrix[len1][0];
    // matrix[len1][0] = matrix[len1][len1];
    // matrix[len1][len1] = matrix[0][len1];
    // matrix[0][len1] = temp;

    // let temp1 = matrix[0][0+1];
    // matrix[0][0+1] = matrix[len1-1][0];
    // matrix[len1-1][0] = matrix[len1][len1-1];
    // matrix[len1][len1-1] = matrix[0+1][len1];
    // matrix[0+1][len1] = temp1;
    // 向里循环
    // while (len2 <= len1) {
    //     // 最外层
    //     let p1 = len1;
    //     let p2 = 0;
    //     while (p2 <= len1) {
    //         let temp1 = matrix[0][p2];
    //         matrix[0][p2] = matrix[p1][0];
    //         matrix[p1][0] = matrix[len1][p1];
    //         matrix[len1][p1] = matrix[p2][len1];
    //         matrix[p2][len1] = temp1;  
    //         p1--;
    //         p2++;
    //     }
    //     len1--;
    //     len2++;
    // }
    // 向里循环
    while (len2 <= len1) {
        // 最外层
        let p1 = len1;
        let p2 = len2;
        // 怎么想到是 p1 != len2的
        // 观察旋转
        while (p1 != len2) {
            let temp1 = matrix[len2][p2];
            matrix[len2][p2] = matrix[p1][len2];
            matrix[p1][len2] = matrix[len1][p1];
            matrix[len1][p1] = matrix[p2][len1];
            matrix[p2][len1] = temp1;  
            p1--;
            p2++;
        }
        len1--;
        len2++;
    }
};
```

* 怎么想到是 p1 != len2的

* | 3    | 0    |
  | ---- | ---- |
  | 2    | 0    |
  | 1    | 0    |
  | 2    | 1    |

* | 4    | 0    |
  | ---- | ---- |
  | 3    | 0    |
  | 2    | 0    |
  | 1    | 0    |
  | 3    | 1    |
  | 2    | 1    |

  

