#include <bits/stdc++.h>
using namespace std;

void leastMinimum(vector<int> &arr, int target)
{
    int low = 0, high = arr.size() - 1;
    vector<int> ans(2);
    ans[0] = INT_MIN, ans[1] = INT_MAX;
    while (low <= high)
    {
        int mid = low + (high - low) / 2;
        if (arr[mid] > target)
        {
            ans[1] = arr[mid];
            high = mid - 1;
        }
        else if (arr[mid] < target)
        {
            ans[0] = arr[mid];
            low = mid + 1;
        }
        else
        {
            cout << arr[mid] << endl;
            return;
        }
    }
    if (abs(target - ans[0]) == abs(target - ans[1]))
    {
        for (auto it : ans)
            cout << it << " ";
    }
    else if (abs(target - ans[0]) > abs(target - ans[1]))
        cout << ans[1];
    else
        cout << ans[0];
}

int main()
{
    int n;
    cout << "Please input size of the array: ";
    cin >> n;
    vector<int> arr(n);
    cout << "Please enter the array of elements: " << endl;
    for (int i = 0; i < n; i++)
    {
        int number;
        cin >> number;
        arr[i] = number;
    }
    cout << "target: ";
    int target;
    cin >> target;
    leastMinimum(arr, target);
    return 0;
}