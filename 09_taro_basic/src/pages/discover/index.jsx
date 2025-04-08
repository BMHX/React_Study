import { View, ScrollView, Input } from '@tarojs/components'
import { AtGrid, AtCard, AtIcon, AtInput, AtButton, AtFloatLayout, AtList, AtListItem, AtSlider } from 'taro-ui'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import './index.scss'

export default function Discover() {
  // 状态变量
  const [activeModule, setActiveModule] = useState(null)
  
  // --- 记账本功能 ---
  const [billRecords, setBillRecords] = useState([])
  const [newBill, setNewBill] = useState({ type: 'expense', amount: '', description: '' })
  const [totalExpense, setTotalExpense] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)
  
  // --- 音乐播放功能 ---
  const [currentMusic, setCurrentMusic] = useState({ title: 'Mojito', artist: '周杰伦', isPlaying: false })
  const [musicList, setMusicList] = useState([
    { id: 1, title: 'Mojito', artist: '周杰伦' },
    { id: 2, title: '以父之名', artist: '周杰伦' },
    { id: 3, title: '稻香', artist: '周杰伦' },
    { id: 4, title: '晴天', artist: '周杰伦' },
    { id: 5, title: '青花瓷', artist: '周杰伦' }
  ])
  const [showMusicList, setShowMusicList] = useState(false)
  const [volume, setVolume] = useState(70)
  
  // --- 个人名片功能 ---
  const [profile, setProfile] = useState({
    name: '张三',
    title: '前端工程师',
    company: 'ABC科技有限公司',
    phone: '13912345678',
    email: 'zhangsan@example.com'
  })
  const [editingProfile, setEditingProfile] = useState(false)
  const [editedProfile, setEditedProfile] = useState({})

  // 功能区块数据
  const features = [
    {
      image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
      value: '记账本',
      onClick: () => handleFeatureClick('记账本')
    },
    {
      image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
      value: '音乐盒子',
      onClick: () => handleFeatureClick('音乐盒子')
    },
    {
      image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
      value: '个人名片',
      onClick: () => handleFeatureClick('个人名片')
    }
  ]

  // 页面显示时加载数据
  useDidShow(() => {
    loadBillData()
    loadMusicData()
    loadProfileData()
  })

  // 处理功能点击
  const handleFeatureClick = (featureName) => {
    setActiveModule(featureName)
  }

  // === 记账本功能实现 ===
  // 加载账单数据
  const loadBillData = () => {
    const bills = Taro.getStorageSync('bills') || []
    setBillRecords(bills)
    
    // 计算总收入和支出
    let expense = 0
    let income = 0
    bills.forEach(bill => {
      if (bill.type === 'expense') {
        expense += Number(bill.amount)
      } else {
        income += Number(bill.amount)
      }
    })
    setTotalExpense(expense)
    setTotalIncome(income)
  }

  // 添加新账单
  const addNewBill = () => {
    if (!newBill.amount || !newBill.description) {
      Taro.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }

    const bills = Taro.getStorageSync('bills') || []
    const newBillItem = {
      ...newBill,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    }
    
    bills.unshift(newBillItem)
    Taro.setStorageSync('bills', bills)
    
    // 重置表单并刷新数据
    setNewBill({ type: 'expense', amount: '', description: '' })
    loadBillData()
    
    Taro.showToast({
      title: '添加成功',
      icon: 'success'
    })
  }

  // 直接处理输入变化，避免焦点问题
  const handleAmountChange = (e) => {
    const { value } = e.detail
    setNewBill({...newBill, amount: value})
  }

  const handleDescriptionChange = (e) => {
    const { value } = e.detail
    setNewBill({...newBill, description: value})
  }

  // 删除账单
  const deleteBill = (id) => {
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      success: (res) => {
        if (res.confirm) {
          const bills = Taro.getStorageSync('bills') || []
          const updatedBills = bills.filter(bill => bill.id !== id)
          Taro.setStorageSync('bills', updatedBills)
          loadBillData()
          
          Taro.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
      }
    })
  }

  // === 音乐播放功能实现 ===
  // 加载音乐数据
  const loadMusicData = () => {
    const savedMusic = Taro.getStorageSync('currentMusic')
    if (savedMusic) {
      setCurrentMusic(savedMusic)
    }
  }

  // 播放/暂停音乐
  const togglePlay = () => {
    const updatedMusic = { ...currentMusic, isPlaying: !currentMusic.isPlaying }
    setCurrentMusic(updatedMusic)
    Taro.setStorageSync('currentMusic', updatedMusic)
    
    Taro.showToast({
      title: updatedMusic.isPlaying ? '开始播放' : '已暂停',
      icon: 'none'
    })
  }

  // 切换音乐
  const changeMusic = (music) => {
    const updatedMusic = { ...music, isPlaying: true }
    setCurrentMusic(updatedMusic)
    Taro.setStorageSync('currentMusic', updatedMusic)
    setShowMusicList(false)
    
    Taro.showToast({
      title: `正在播放: ${music.title}`,
      icon: 'none'
    })
  }

  // 调整音量
  const handleVolumeChange = (value) => {
    setVolume(value)
  }

  // === 个人名片功能实现 ===
  // 加载个人资料
  const loadProfileData = () => {
    const savedProfile = Taro.getStorageSync('userProfile')
    if (savedProfile) {
      setProfile(savedProfile)
    }
  }

  // 开始编辑个人资料
  const startEditProfile = () => {
    setEditedProfile({ ...profile })
    setEditingProfile(true)
  }

  // 保存个人资料
  const saveProfile = () => {
    setProfile(editedProfile)
    Taro.setStorageSync('userProfile', editedProfile)
    setEditingProfile(false)
    
    Taro.showToast({
      title: '保存成功',
      icon: 'success'
    })
  }

  // 更新编辑中的资料
  const updateEditedProfile = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value })
  }

  // 处理输入变化
  const handleProfileInputChange = (field, e) => {
    const { value } = e.detail
    setEditedProfile({ ...editedProfile, [field]: value })
  }

  return (
    <View className='discover'>
      <View className='discover-grid'>
        <AtGrid data={features} columnNum={3} hasBorder={false} />
      </View>

      {/* 记账本卡片 */}
      <View className='discover-card'>
        <AtCard
          title='记账本'
          thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
          onClick={() => handleFeatureClick('记账本')}
        >
          <View className='card-content'>
            <View className='card-item'>
              <AtIcon value='money' size='24' color='#6190E8'></AtIcon>
              <View className='card-text'>
                <View className='card-title'>本月支出</View>
                <View className='card-value'>¥ {totalExpense.toFixed(2)}</View>
              </View>
            </View>
            <View className='card-item'>
              <AtIcon value='shopping-bag' size='24' color='#FF4949'></AtIcon>
              <View className='card-text'>
                <View className='card-title'>本月收入</View>
                <View className='card-value'>¥ {totalIncome.toFixed(2)}</View>
              </View>
            </View>
          </View>
        </AtCard>
      </View>

      {/* 音乐盒子卡片 */}
      <View className='discover-card'>
        <AtCard
          title='音乐盒子'
          thumb='https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png'
          onClick={() => handleFeatureClick('音乐盒子')}
        >
          <View className='card-content music-card'>
            <View className='music-info'>
              <View className='music-title'>{currentMusic.title}</View>
              <View className='music-artist'>{currentMusic.artist}</View>
            </View>
            <View className='music-controls'>
              <AtIcon value='playlist' size='22' color='#6190E8' onClick={() => setShowMusicList(true)}></AtIcon>
              <AtIcon value={currentMusic.isPlaying ? 'pause' : 'play'} size='24' color='#6190E8' onClick={togglePlay}></AtIcon>
              <AtIcon value='sound' size='22' color='#6190E8' onClick={() => Taro.showToast({title: `音量: ${volume}%`, icon: 'none'})}></AtIcon>
            </View>
          </View>
        </AtCard>
      </View>

      {/* 个人名片卡片 */}
      <View className='discover-card'>
        <AtCard
          title='个人名片'
          thumb='https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
          onClick={() => handleFeatureClick('个人名片')}
        >
          <View className='card-content'>
            <View className='namecard'>
              <View className='namecard-avatar'>
                <View className='avatar-placeholder'>头像</View>
              </View>
              <View className='namecard-info'>
                <View className='namecard-name'>{profile.name}</View>
                <View className='namecard-title'>{profile.title}</View>
                <View className='namecard-company'>{profile.company}</View>
              </View>
            </View>
            <View className='namecard-contact'>
              <View className='contact-item'>
                <AtIcon value='phone' size='18' color='#6190E8'></AtIcon>
                <View>{profile.phone}</View>
              </View>
              <View className='contact-item'>
                <AtIcon value='mail' size='18' color='#6190E8'></AtIcon>
                <View>{profile.email}</View>
              </View>
            </View>
            <AtButton size='small' onClick={startEditProfile}>编辑资料</AtButton>
          </View>
        </AtCard>
      </View>

      {/* 记账本浮层 */}
      <AtFloatLayout
        isOpened={activeModule === '记账本'}
        title='记账本'
        onClose={() => setActiveModule(null)}
      >
        <View className='bill-form'>
          <View className='form-group'>
            <View className='form-label'>类型</View>
            <View className='bill-type-selector'>
              <View 
                className={`type-item ${newBill.type === 'expense' ? 'active' : ''}`}
                onClick={() => setNewBill({...newBill, type: 'expense'})}
              >
                支出
              </View>
              <View 
                className={`type-item ${newBill.type === 'income' ? 'active' : ''}`}
                onClick={() => setNewBill({...newBill, type: 'income'})}
              >
                收入
              </View>
            </View>
          </View>
          
          <View className='custom-input'>
            <View className='input-label'>金额</View>
            <Input
              className='input-field'
              type='digit'
              placeholder='请输入金额'
              value={newBill.amount}
              onInput={handleAmountChange}
            />
          </View>

          <View className='custom-input'>
            <View className='input-label'>描述</View>
            <Input
              className='input-field'
              type='text'
              placeholder='请输入描述'
              value={newBill.description}
              onInput={handleDescriptionChange}
            />
          </View>
          
          <AtButton type='primary' onClick={addNewBill}>添加记录</AtButton>
        </View>

        <View className='bill-list'>
          <View className='list-title'>最近记录</View>
          <ScrollView scrollY style={{maxHeight: '300px'}}>
            {billRecords.length > 0 ? (
              billRecords.map(bill => (
                <View className='bill-item' key={bill.id}>
                  <View className='bill-info'>
                    <View className='bill-description'>{bill.description}</View>
                    <View className='bill-date'>{bill.date}</View>
                  </View>
                  <View className={`bill-amount ${bill.type === 'income' ? 'income' : 'expense'}`}>
                    {bill.type === 'income' ? '+' : '-'} {bill.amount}
                  </View>
                  <AtIcon value='trash' size='20' color='#FF4949' className='bill-delete' onClick={() => deleteBill(bill.id)}></AtIcon>
                </View>
              ))
            ) : (
              <View className='empty-tip'>暂无记录</View>
            )}
          </ScrollView>
        </View>
      </AtFloatLayout>

      {/* 音乐播放器浮层 */}
      <AtFloatLayout
        isOpened={activeModule === '音乐盒子'}
        title='音乐盒子'
        onClose={() => setActiveModule(null)}
      >
        <View className='music-player'>
          <View className='current-music'>
            <View className='music-cover'>
              <AtIcon value='play' size='30' color='#fff'></AtIcon>
            </View>
            <View className='music-details'>
              <View className='music-title'>{currentMusic.title}</View>
              <View className='music-artist'>{currentMusic.artist}</View>
            </View>
          </View>

          <View className='music-controls-full'>
            <AtIcon value='playlist' size='24' color='#6190E8' onClick={() => setShowMusicList(!showMusicList)}></AtIcon>
            <View className='main-controls'>
              <AtIcon value='chevron-left' size='24' color='#6190E8'></AtIcon>
              <AtIcon 
                value={currentMusic.isPlaying ? 'pause' : 'play'} 
                size='36' 
                color='#6190E8'
                onClick={togglePlay}
              ></AtIcon>
              <AtIcon value='chevron-right' size='24' color='#6190E8'></AtIcon>
            </View>
            <AtIcon value='sound' size='24' color='#6190E8'></AtIcon>
          </View>

          <View className='volume-control'>
            <AtIcon value='volume-minus' size='20' color='#6190E8'></AtIcon>
            <AtSlider 
              value={volume}
              min={0}
              max={100}
              onChange={handleVolumeChange}
              activeColor='#6190E8'
              backgroundColor='#e5e5e5'
              blockColor='#6190E8'
              blockSize={24}
            />
            <AtIcon value='volume-plus' size='20' color='#6190E8'></AtIcon>
          </View>

          {showMusicList && (
            <View className='music-list'>
              <View className='list-title'>播放列表</View>
              <AtList>
                {musicList.map(music => (
                  <AtListItem
                    key={music.id}
                    title={music.title}
                    note={music.artist}
                    arrow='right'
                    onClick={() => changeMusic(music)}
                  />
                ))}
              </AtList>
            </View>
          )}
        </View>
      </AtFloatLayout>

      {/* 个人名片编辑浮层 */}
      <AtFloatLayout
        isOpened={editingProfile}
        title='编辑个人资料'
        onClose={() => setEditingProfile(false)}
      >
        <View className='profile-form'>
          <View className='custom-input'>
            <View className='input-label'>姓名</View>
            <Input
              className='input-field'
              type='text'
              placeholder='请输入姓名'
              value={editedProfile.name}
              onInput={(e) => handleProfileInputChange('name', e)}
            />
          </View>
          <View className='custom-input'>
            <View className='input-label'>职位</View>
            <Input
              className='input-field'
              type='text'
              placeholder='请输入职位'
              value={editedProfile.title}
              onInput={(e) => handleProfileInputChange('title', e)}
            />
          </View>
          <View className='custom-input'>
            <View className='input-label'>公司</View>
            <Input
              className='input-field'
              type='text'
              placeholder='请输入公司'
              value={editedProfile.company}
              onInput={(e) => handleProfileInputChange('company', e)}
            />
          </View>
          <View className='custom-input'>
            <View className='input-label'>电话</View>
            <Input
              className='input-field'
              type='number'
              placeholder='请输入电话'
              value={editedProfile.phone}
              onInput={(e) => handleProfileInputChange('phone', e)}
            />
          </View>
          <View className='custom-input'>
            <View className='input-label'>邮箱</View>
            <Input
              className='input-field'
              type='text'
              placeholder='请输入邮箱'
              value={editedProfile.email}
              onInput={(e) => handleProfileInputChange('email', e)}
            />
          </View>
          <AtButton type='primary' onClick={saveProfile}>保存</AtButton>
        </View>
      </AtFloatLayout>
    </View>
  )
} 